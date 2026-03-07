import React from 'react';
import Link from '@docusaurus/Link';
import styles from './HandbookBlocks.module.css';

function renderCell(cell) {
  if (Array.isArray(cell)) {
    return (
      <ul className={styles.bulletList}>
        {cell.map((item) => (
          <li key={typeof item === 'string' ? item : item.label}>
            {renderCell(item)}
          </li>
        ))}
      </ul>
    );
  }

  if (cell && typeof cell === 'object') {
    if (cell.href) {
      return <Link to={cell.href}>{cell.label}</Link>;
    }
    return cell.label ?? '';
  }

  return cell;
}

export default function DecisionMatrix({title, description, columns, rows}) {
  if (!Array.isArray(columns) || columns.length === 0 || !Array.isArray(rows) || rows.length === 0) {
    return null;
  }

  return (
    <section className={styles.panel}>
      {(title || description) && (
        <div className={styles.header}>
          {title ? <h2 className={styles.title}>{title}</h2> : null}
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
      )}
      <div className={styles.tableWrap}>
        <table className={styles.matrix}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={`${row.id}-${column.key}`}>{renderCell(row[column.key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
