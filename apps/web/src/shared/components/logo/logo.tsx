import { mainLogoSvg } from '~/assets';
import { Image } from '~/shared/components/image/image';

type LogoProps = {
  size?: number;
};

export const Logo = ({ size = 30 }: LogoProps) => {
  return (
    <div style={{ width: size, height: size }}>
      <Image src={mainLogoSvg} shouldFitContainer />
    </div>
  );
};
