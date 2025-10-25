import { type CSSProperties } from 'react';
import logoImageSrc from '~/assets/images/logos/logo.svg';
import { Image } from '~/common/components/image/image';

type Props = {
  width?: CSSProperties['width'];
};

export const Logo = ({ width = 30 }: Props) => {
  return (
    <div style={{ width }}>
      <Image src={logoImageSrc} shouldFitContainer />
    </div>
  );
};
