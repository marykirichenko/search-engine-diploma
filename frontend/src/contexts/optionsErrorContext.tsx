import {useState, createContext, useContext} from "react";

interface OptionsErrorContextType {
    validationErrors: {
        doi?: string;
        issn?: string;
        isbn?: string;
        query?: string;
    };
    setValidationErrors: React.Dispatch<React.SetStateAction<{
        doi?: string;
        issn?: string;
        isbn?: string;
        query?: string;
    }>>;
}

const OptionsErrorContext = createContext<OptionsErrorContextType | undefined>(undefined)

export const OptionsErrorProvider = ({children}: {children: React.ReactNode}) => {
    const [validationErrors, setValidationErrors] = useState<{
        doi?: string;
        issn?: string;
        isbn?: string;
        query?: string;
    }>({});

    return (
        <OptionsErrorContext.Provider value={{validationErrors, setValidationErrors}}>
            {children}
        </OptionsErrorContext.Provider>
    );
}

export const useOptionsError = () => {
    const context = useContext(OptionsErrorContext)
    if (context === undefined) {
        throw new Error('useOptionsError must be used within a OptionsErrorProvider')
    }
    return context
}
