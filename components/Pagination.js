import React from 'react'
import styles from '@/styles/adminDashboard.module.css'

const Pagination = ({ totalPages, currentPage, handlePageClick }) => {

    const PAGES_PER_INTERVAL = 5;

    const generatePageButtons = (totalPages) => {
        const buttons = [];
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > PAGES_PER_INTERVAL) {
            const halfInterval = Math.floor(PAGES_PER_INTERVAL / 2);
            startPage = Math.max(currentPage - halfInterval, 1);
            endPage = startPage + PAGES_PER_INTERVAL - 1;

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(endPage - PAGES_PER_INTERVAL + 1, 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button key={i} onClick={() => handlePageClick(i)} className={styles.pagination_btn} disabled={i === currentPage}>
                    {i}
                </button>
            );
        }

        if (startPage > 1) {
            buttons.unshift(
                <button key="prev" className={styles.pagination_btn_prev_next} onClick={() => handlePageClick(startPage - 1)}>
                    &laquo;
                </button>
            );
        }

        if (endPage < totalPages) {
            buttons.push(
                <button key="next" className={styles.pagination_btn_prev_next} onClick={() => handlePageClick(endPage + 1)}>
                    &raquo;
                </button>
            );
        }

        return buttons;
    }



    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>{generatePageButtons(totalPages)}</div>
    )
}

export default Pagination