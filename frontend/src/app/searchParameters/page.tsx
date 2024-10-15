"use client"
import {SearchParameters} from "@/components/searchParameters";
import {OptionsErrorProvider} from "@/contexts/optionsErrorContext";

export default function Page(){
        return <OptionsErrorProvider>
                <SearchParameters/>
        </OptionsErrorProvider>
}
