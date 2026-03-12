import React from 'react';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import {validatedRoles} from '@site/src/data/rolesContent';
import LinkTile from './LinkTile';
import SectionBlock from './SectionBlock';

const {roleBasedEntry} = portalContent;

export default function RoleBasedEntry() {
  return (
    <SectionBlock
      description={roleBasedEntry.description}
      kicker={roleBasedEntry.kicker}
      title={roleBasedEntry.title}
    >
      <div className={styles.roleGrid}>
        {validatedRoles.map((role) => (
          <LinkTile
            key={role.id}
            description={role.description}
            href={role.href}
            title={role.title}
          />
        ))}
      </div>
    </SectionBlock>
  );
}
