"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { motion, useInView } from "framer-motion"

interface ContributionDay {
  date: string
  count: number
  level: number // 0-4
}

interface ContributionData {
  total: { lastYear: number }
  contributions: ContributionDay[]
}

const GITHUB_USERNAME = "itslokeshx"

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

const DAY_LABELS = ["Mon", "Wed", "Fri"]

// Cyan-themed intensity levels matching the portfolio
const LEVEL_COLORS = [
  "rgba(255, 255, 255, 0.03)",   // Level 0 - empty
  "rgba(57, 211, 83, 0.25)",     // Level 1
  "rgba(57, 211, 83, 0.50)",     // Level 2
  "rgba(57, 211, 83, 0.75)",     // Level 3
  "rgba(57, 211, 83, 1.0)",      // Level 4
]

function getLevel(count: number): number {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 9) return 3
  return 4
}

function generateFallbackData(): ContributionData {
  const contributions: ContributionDay[] = []
  const today = new Date()
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  // Start from the Sunday of the week one year ago
  const start = new Date(oneYearAgo)
  start.setDate(start.getDate() - start.getDay())

  let total = 0
  const current = new Date(start)

  while (current <= today) {
    const dayOfWeek = current.getDay()
    // Generate realistic-looking random data
    const isWeekday = dayOfWeek > 0 && dayOfWeek < 6
    const rand = Math.random()
    let count = 0

    if (isWeekday) {
      if (rand > 0.3) count = Math.floor(Math.random() * 8) + 1
    } else {
      if (rand > 0.6) count = Math.floor(Math.random() * 5)
    }

    total += count
    contributions.push({
      date: current.toISOString().split("T")[0],
      count,
      level: getLevel(count),
    })

    current.setDate(current.getDate() + 1)
  }

  return { total: { lastYear: total }, contributions }
}

function processContributions(data: ContributionData) {
  const weeks: ContributionDay[][] = []
  let currentWeek: ContributionDay[] = []

  // Pad the first week if it doesn't start on Sunday
  if (data.contributions.length > 0) {
    const firstDay = new Date(data.contributions[0].date).getDay()
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({ date: "", count: -1, level: -1 }) // placeholder
    }
  }

  for (const day of data.contributions) {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  // Pad the last week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: "", count: -1, level: -1 })
    }
    weeks.push(currentWeek)
  }

  return weeks
}

function getMonthPositions(weeks: ContributionDay[][]) {
  const months: { label: string; col: number }[] = []
  let lastMonth = -1

  weeks.forEach((week, weekIndex) => {
    for (const day of week) {
      if (day.date) {
        const month = new Date(day.date).getMonth()
        if (month !== lastMonth) {
          months.push({ label: MONTH_LABELS[month], col: weekIndex })
          lastMonth = month
          break
        }
      }
    }
  })

  return months
}

function calculateStreak(contributions: ContributionDay[]): number {
  let streak = 0
  // Walk backwards from today
  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) {
      streak++
    } else {
      // Allow today to be 0 (day might not be over yet)
      if (i === contributions.length - 1) continue
      break
    }
  }
  return streak
}

export function GitHubStreak() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })
  const [data, setData] = useState<ContributionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!isInView) return

    const fetchContributions = async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        )
        if (!res.ok) throw new Error("API failed")
        const json = await res.json()

        // Normalize the API response
        const contributions: ContributionDay[] = json.contributions.map(
          (c: { date: string; count: number; level: number }) => ({
            date: c.date,
            count: c.count,
            level: c.level,
          })
        )

        setData({
          total: json.total,
          contributions,
        })
      } catch {
        console.warn("GitHub contributions API failed, using fallback")
        setError(true)
        setData(generateFallbackData())
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [isInView])

  const weeks = useMemo(() => (data ? processContributions(data) : []), [data])
  const monthPositions = useMemo(
    () => (weeks.length > 0 ? getMonthPositions(weeks) : []),
    [weeks]
  )
  const currentStreak = useMemo(
    () => (data ? calculateStreak(data.contributions) : 0),
    [data]
  )

  const cellSize = 13
  const cellGap = 3
  const totalCellSize = cellSize + cellGap

  return (
    <section
      id="github"
      ref={sectionRef}
      className="relative py-16 md:py-20 px-4 md:px-8 overflow-hidden bg-void"
    >
      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-cyan/60 text-sm mb-4">
            // COMMIT_HISTORY
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            GITHUB <span className="text-cyan">ACTIVITY</span>
            <span className="text-cyan animate-pulse ml-2">▮</span>
          </h2>
          <p className="text-mist/60 max-w-2xl mx-auto">
            Contributions Timeline
          </p>
        </motion.div>

        {/* Contribution Graph Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="bg-[#0a0a0a] rounded-2xl border-2 border-cyan/20 overflow-hidden hover:border-cyan/30 transition-colors duration-500 w-fit mx-auto"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-titanium/80 border-b border-cyan/20">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-xs font-mono text-cyan/70">
              contributions.graph
            </span>
            <div className="ml-auto">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-mist/40 hover:text-cyan transition-colors flex items-center gap-1.5"
              >
                @{GITHUB_USERNAME}
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Graph Body */}
          <div className="p-5 md:p-8">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-cyan/40 border-t-cyan rounded-full animate-spin" />
                  <span className="text-mist/50 font-mono text-sm">
                    Loading contributions...
                  </span>
                </div>
              </div>
            ) : (
              <>
                {/* Scrollable graph area */}
                <div className="overflow-hidden pb-2">
                  <div className="relative inline-block" style={{ paddingLeft: 32 }}>
                    {/* Month labels — absolutely positioned above grid columns */}
                    <div className="relative" style={{ height: 20, marginBottom: 4 }}>
                      {monthPositions.map((month, i) => (
                        <span
                          key={`${month.label}-${i}`}
                          className="text-[11px] font-mono text-mist/40"
                          style={{
                            position: "absolute",
                            left: month.col * totalCellSize,
                            top: 0,
                          }}
                        >
                          {month.label}
                        </span>
                      ))}
                    </div>

                    {/* Day labels + Cells row */}
                    <div className="flex">
                      {/* Day labels column */}
                      <div
                        className="flex flex-col flex-shrink-0"
                        style={{ width: 32, marginLeft: -32 }}
                      >
                        {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
                          <div
                            key={dayIndex}
                            style={{
                              height: totalCellSize,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              paddingRight: 6,
                            }}
                          >
                            <span className="text-[10px] font-mono text-mist/40 leading-none">
                              {dayIndex === 1
                                ? "Mon"
                                : dayIndex === 3
                                  ? "Wed"
                                  : dayIndex === 5
                                    ? "Fri"
                                    : ""}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Contribution cells grid */}
                      <div className="flex gap-[3px]">
                        {weeks.map((week, weekIndex) => (
                          <div
                            key={weekIndex}
                            className="flex flex-col gap-[3px]"
                          >
                            {week.map((day, dayIndex) => (
                              <motion.div
                                key={`${weekIndex}-${dayIndex}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={
                                  isInView
                                    ? { opacity: 1, scale: 1 }
                                    : { opacity: 0, scale: 0 }
                                }
                                transition={{
                                  duration: 0.15,
                                  delay: Math.min(weekIndex * 0.008 + dayIndex * 0.002, 1.5),
                                  ease: "easeOut",
                                }}
                                className="group relative"
                              >
                                <div
                                  style={{
                                    width: cellSize,
                                    height: cellSize,
                                    borderRadius: 3,
                                    background:
                                      day.level === -1
                                        ? "transparent"
                                        : LEVEL_COLORS[day.level],
                                    border:
                                      day.level === -1
                                        ? "none"
                                        : day.level === 0
                                          ? "1px solid rgba(57, 211, 83, 0.08)"
                                          : "none",
                                    transition: "all 0.2s ease",
                                  }}
                                  className="hover:ring-1 hover:ring-green-400/50 hover:scale-125 cursor-default"
                                />
                                {/* Tooltip */}
                                {day.date && (
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-[#1a1a1a] border border-cyan/20 rounded-lg text-[10px] font-mono text-mist/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg shadow-black/50">
                                    <span className="text-cyan">
                                      {day.count}
                                    </span>{" "}
                                    contribution{day.count !== 1 ? "s" : ""} on{" "}
                                    {new Date(day.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      }
                                    )}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-cyan/20" />
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer: Total + Legend */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5 pt-4 border-t border-white/5 gap-3">
                  <div className="flex items-center gap-4 flex-wrap">
                    <a
                      href={`https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono text-mist/50 hover:text-cyan transition-colors"
                    >
                      <span className="text-mist/70 font-semibold">
                        {data?.total?.lastYear?.toLocaleString() ?? "—"}
                      </span>{" "}
                      contributions in the last year
                      {error && (
                        <span className="text-mist/30 text-xs ml-2">
                          (estimated)
                        </span>
                      )}
                    </a>
                    {currentStreak > 0 && (
                      <span className="text-sm font-mono text-mist/50 flex items-center gap-1.5">
                        <span className="text-orange-400">🔥</span>
                        <span className="text-mist/70 font-semibold">{currentStreak}</span> day streak
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono text-mist/35 mr-1">
                      Less
                    </span>
                    {LEVEL_COLORS.map((color, i) => (
                      <div
                        key={i}
                        style={{
                          width: 11,
                          height: 11,
                          borderRadius: 2,
                          background: color,
                          border:
                            i === 0
                              ? "1px solid rgba(57, 211, 83, 0.08)"
                              : "none",
                        }}
                      />
                    ))}
                    <span className="text-[11px] font-mono text-mist/35 ml-1">
                      More
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
