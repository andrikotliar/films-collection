import styles from './video.module.css';

type VideoProps = {
  url: string;
};

export const Video = ({ url }: VideoProps) => {
  return (
    <div className={styles.video}>
      <iframe src={url} allow="autoplay" allowFullScreen />
    </div>
  );
};
