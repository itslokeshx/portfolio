"use client";
import styles from "./contact.module.css";

export default function ContactHTML() {
    return (
        <section id="contact-trigger" className={styles.contactSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>INITIATE UPLINK</h2>

                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.group}>
                        <label>IDENTITY</label>
                        <input type="text" placeholder="Name or Alias" className={styles.input} />
                    </div>

                    <div className={styles.group}>
                        <label>COORDINATES</label>
                        <input type="email" placeholder="Email Address" className={styles.input} />
                    </div>

                    <div className={styles.group}>
                        <label>TRANSMISSION</label>
                        <textarea placeholder="Message Content..." rows={5} className={styles.textarea}></textarea>
                    </div>

                    <button type="submit" className={styles.button}>SEND TRANSMISSION</button>
                </form>

                <div className={styles.footer}>
                    <p>&copy; 2026 LOKI. ALL SYSTEMS NOMINAL.</p>
                </div>
            </div>
        </section>
    );
}
