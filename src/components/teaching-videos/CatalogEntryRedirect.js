import React, {useEffect} from 'react';
import {useHistory} from '@docusaurus/router';
import styles from './styles.module.css';

export default function CatalogEntryRedirect({label, to}) {
  const history = useHistory();

  useEffect(() => {
    history.replace(to);
  }, [history, to]);

  return <div className={styles.emptyState}>正在跳转到{label}...</div>;
}
