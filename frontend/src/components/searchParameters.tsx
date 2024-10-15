import { styled } from "@mui/material/styles";
import { Tabs, Tab, Box, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PackedAccordion } from "@/components/accordation";
import { DOIOptions } from "@/components/options/doiOptions";
import { QueryOptions } from "@/components/options/queryOptions";
import { SerialNumberOptions } from "@/components/options/serialNumberOptions";
import { GeneralOptions } from "@/components/options/generalOptions";
import {ExtensiveSearchButton} from "@/components/extensiveSearchButton";
import {useOptionsError} from "@/contexts/optionsErrorContext";

export interface SearchProps {
    searchType: 'Article' | 'DOI' | 'ISSN' | 'ISBN',
    literatureType?: {
        type: string,
        exclude: boolean
    },
    queries?: string[],
    constraints?: string[],
    keyword?: string,
    dois?: string[],
    dateRange?: [Date | null, Date | null],
    serialNumber?: string
}

// TODO add info boxes with information about each fields
// TODO refactor component to reduce the complexity
// TODO: fix the problem with initial loading happening 2 times (useEffect logic problem)

export const SearchParameters = () => {
    const [value, setValue] = useState(0);
    const [literatureType, setLiteratureType] = useState('Book');
    const [exclude, setExclude] = useState(false);
    const [queries, setQueries] = useState<string[]>(['']);
    const [keyword, setKeyword] = useState('');
    const [dois, setDois] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [serialNumber, setSerialNumber] = useState('');
    const [constraints, setConstraints] = useState(['AND'])
    const router = useRouter();
    const searchParams = useSearchParams();
    const {setValidationErrors} = useOptionsError();

    useEffect(() => {
        const tab = parseInt(searchParams.get('tab') as string, 10);
        if (!isNaN(tab)) {
            setValue(tab);
        }
        setValidationErrors({doi: '', issn: '', isbn: '', query: ''})
        setDois([]);
        setQueries(['']);
        setKeyword('');
        setSerialNumber('');
        setDateRange([null, null]);
        setConstraints(['AND'])

    }, [searchParams]);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
        router.push(`/searchParameters?tab=${newValue}`);
    };

    const handleBookChange = (event: SelectChangeEvent<string>) => {
        setLiteratureType(event.target.value as string);
    };

    const handleExcludeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setExclude(event.target.checked);
    };

    return (
        <SearchOptionsWrapper>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="by Article characteristics" />
                <Tab label="by DOI" />
                <Tab label="by ISSN" />
                <Tab label="by ISBN" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <GeneralOptions
                    literatureType={literatureType}
                    handleChange={handleBookChange}
                    exclude={exclude}
                    handleExcludeChange={handleExcludeChange}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                />
                <QueryOptions
                    queries={queries}
                    setQueries={setQueries}
                    keyword={keyword}
                    setKeyword={setKeyword}
                    constraints={constraints}
                    setConstraints={setConstraints}
                />
                <ExtensiveSearchButton searchType={'Article'} literatureType={{type: literatureType, exclude}} queries={queries} constraints={constraints} keyword={keyword} dateRange={dateRange}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PackedAccordion summary="What is Digital Object Identifier (DOI)?" details="Digital Object Identifier - a unique alphanumeric string assigned to a digital object, such as a research article, dataset, or book. It provides a persistent and permanent link to the object, allowing it to be easily identified, cited, and accessed." />
                <GeneralOptions
                    literatureType={literatureType}
                    handleChange={handleBookChange}
                    exclude={exclude}
                    handleExcludeChange={handleExcludeChange}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                />
                <DOIOptions dois={dois} setDois={setDois}/>
                <ExtensiveSearchButton searchType={'DOI'} literatureType={{type: literatureType, exclude}} dois={dois} dateRange={dateRange}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PackedAccordion summary="What is International Standard Serial Number (ISSN)?" details="International Standart Serial Number - an 8-digit code used to uniquely identify a serial publication, such as a journal, magazine, or periodical, in print or electronic format." />
                <GeneralOptions
                    literatureType={literatureType}
                    handleChange={handleBookChange}
                    exclude={exclude}
                    handleExcludeChange={handleExcludeChange}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                />
                <SerialNumberOptions serialNumberType={'ISSN'} serialNumber={serialNumber} setSerialNumber={setSerialNumber} />
                <ExtensiveSearchButton searchType={'ISSN'} literatureType={{type: literatureType, exclude}}  dateRange={dateRange} serialNumber={serialNumber}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <PackedAccordion summary="What is International Standard Book Number (ISBN)?" details="International Standard Book Number (ISBN) is a 13-digit or 10-digit unique identifier assigned to a book or book-like publication. It is used to identify and manage books in various formats, including print, e-book, and audiobook." />
                <GeneralOptions
                    literatureType={literatureType}
                    handleChange={handleBookChange}
                    exclude={exclude}
                    handleExcludeChange={handleExcludeChange}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                />
                <SerialNumberOptions serialNumberType={'ISBN'} serialNumber={serialNumber} setSerialNumber={setSerialNumber} />
                <ExtensiveSearchButton searchType={'ISBN'} literatureType={{type: literatureType, exclude}} dateRange={dateRange} serialNumber={serialNumber}/>
            </TabPanel>
        </SearchOptionsWrapper>
    );
};

const SearchOptionsWrapper = styled('div')({
    margin: '20px'
});

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};
