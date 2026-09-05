import { mainLogoSvg } from '~/assets';
import { Image } from '~/shared/components/image/image';

type LogoProps = {
  size?: number;
  className?: string;
};

export const Logo = ({ size = 30, className }: LogoProps) => {
  return (
    <div style={{ width: size, height: size }} className={className}>
      <Image src={mainLogoSvg} shouldFitContainer />
    </div>
  );
};
