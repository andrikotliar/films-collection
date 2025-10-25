import styles from './styles.module.css';

type VideoProps = {
  trailerId: string;
  shouldAutoPlay: boolean;
};

export const Video = ({ trailerId, shouldAutoPlay }: VideoProps) => {
  const autoPlayOption = shouldAutoPlay ? '1' : '0';

  return (
    <div className={styles.video}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${trailerId}?rel=0&showinfo=0&autoplay=${autoPlayOption}`}
        allow="autoplay"
        allowFullScreen
      />
    </div>
  );
};
