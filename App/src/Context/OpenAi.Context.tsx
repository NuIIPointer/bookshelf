import { Configuration, OpenAIApi } from 'openai';
import React, { createContext, useEffect, useState } from 'react';

const configuration = new Configuration({
    organization: process.env.OPEN_AI_KEY,
    apiKey: process.env.OPEN_AI_ORG,
});
const openai = new OpenAIApi(configuration);

export const OpenAiContext = createContext<{ pageIndex: number; setPageIndex: Function }>({
    pageIndex: 0,
    setPageIndex: () => {},
});

type OpenAiContextProviderTypes = {
    children: React.ReactNode | string;
};

const OpenAiContextProvider = ({ children }: OpenAiContextProviderTypes) => {
    const [pageIndex, setPageIndex] = useState<number>(0);

    useEffect(() => {
        const doSo = async () => {
            const response = await openai.listEngines();
            console.log('response', response);
        };

        doSo();
    }, []);

    return (
        <OpenAiContext.Provider value={{ pageIndex, setPageIndex }}>{children}</OpenAiContext.Provider>
    );
};

export default OpenAiContextProvider;
