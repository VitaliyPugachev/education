declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
    // @ts-ignore
    import React from 'react';

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;

type DeepPartial<T> = T extends object ? {
    [P in keyof T]? : DeepPartial<T[P]>
} : T;

type OptionalRecord<K extends keyof any, T> = {
    [P in K]? : T
};

declare module "react-dom/client" {
    // typing module default export as `any` will allow you to access its members without compiler warning
    var createRoot: any;
    export {createRoot};
}
