type Toolkit = {
    id: number;
    title: string;
    summary: string;
    href?:string;
    facets: {content_types: string[], topics: string[]};
}