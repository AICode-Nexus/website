import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function LinkTile({title, description, href, className}) {
  return (
    <Link className={clsx(styles.linkTile, className)} to={href}>
      <strong>{title}</strong>
      <p>{description}</p>
    </Link>
  );
}
