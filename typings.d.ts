declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module 'js-export-excel';
declare module 'rc-bullets';
declare module 'react-slick';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
