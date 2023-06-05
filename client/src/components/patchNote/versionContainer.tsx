import FC from 'react';
import styles from '~/components/patchNote/versionContainer.module.scss';

interface VersionDataObject {
  date: string;
  version: string;
  update: {
    version?: string;
    content: string[];
  }[];
};

interface VersionContainerProps {
  data : VersionDataObject;
}

const VersionContainer = ({ data: { date, version, update } }: VersionContainerProps)=>{
  return <div className={styles.versionContainer}>
    <div className={styles.versionTitle}>
      <p>{date}</p>
      <h2>Version {version}</h2>
    </div>
    <div className={styles.versionContent}>
      {update.map(({version,content}, index)=>
        <div key={index} className={styles.update}>
          {version && <p>{version}</p>}
          <ul>
            {content.map((text, index)=>
              <li key={index}>{text}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  </div>
};

export default VersionContainer;
