import english from 'hyphenation.de';
import Hypher from 'hypher';
import { useMemo } from 'react';

const h = new Hypher(english);

const useHyphener = (text: string) => {
    const hyphenatedText = useMemo(() => h.hyphenateText(text), [text]);

    return hyphenatedText;
};

export default useHyphener;
