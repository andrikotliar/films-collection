import { api, Button, debounce, Image, type ApiResponse } from '~/shared';
import styles from './film-counter.module.css';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useCallback, useState } from 'react';

type FilmCounterProps = {
  data: ApiResponse<typeof api.films.admin.list>['films'][number];
};

export const FilmCounter = ({ data }: FilmCounterProps) => {
  const [counter, setCounter] = useState(data.watchCount);

  const updateCounter = useCallback(
    debounce(async (counter: number) => {
      await api.films.admin.watchcounter.patch({ params: { id: data.id }, input: { counter } });
    }, 2000),
    [],
  );

  const decreaseCounter = useCallback((counter: number) => {
    const updatedCounter = counter === 0 ? 0 : counter - 1;

    setCounter(updatedCounter);
    updateCounter(updatedCounter);
  }, []);

  const increaseCounter = useCallback((counter: number) => {
    const updatedCounter = counter + 1;
    setCounter(updatedCounter);
    updateCounter(updatedCounter);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Image src={data.poster} />
      <div className={styles.actions}>
        <Button
          variant="ghost"
          icon={<ChevronLeftIcon />}
          onClick={() => decreaseCounter(counter)}
        />
        <span className={styles.counter}>{counter}</span>
        <Button
          variant="ghost"
          icon={<ChevronRightIcon />}
          onClick={() => increaseCounter(counter)}
        />
      </div>
    </div>
  );
};
