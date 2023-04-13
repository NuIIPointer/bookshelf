import * as React from 'react';
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        width={800}
        height={800}
        data-name="Layer 1"
        viewBox="0 0 24 24"
        {...props}>
        <defs>
            <style>
                {'.cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px}'}
            </style>
        </defs>
        <path
            d="M22.52 7.24v2.29a5.34 5.34 0 0 1-3 4.82 4.21 4.21 0 0 1 1.11 2.83v1.54H16.2a4.19 4.19 0 0 1-4.2-3.83 4.19 4.19 0 0 1-4.2 3.83H3.39v-1.54a4.21 4.21 0 0 1 1.11-2.83 5.34 5.34 0 0 1-3-4.82V7.24h5.13a4.94 4.94 0 0 1 1 .09A9.81 9.81 0 0 1 12 1.5a9.81 9.81 0 0 1 4.42 5.83 4.94 4.94 0 0 1 .95-.09ZM12 7.24V23.5M6.26 11.07 12 14.89M16.78 11.07 12 13.93"
            className="cls-1"
        />
    </svg>
);
export default SvgComponent;
