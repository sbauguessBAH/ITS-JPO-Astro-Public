type Toolkit = {
    id: number;
    title: string;
    image_url?: string;
    summary: string;
    href?:string;
    facets: {content_types: string[], topics: string[]};
}

type RawToolkit = {
    id?: unknown;
    title?: unknown;
    image_url?: unknown;
    description?: unknown;
    url?: unknown;
    content_types?: unknown;
    topics?: unknown;
    toolkit_type?: unknown;
}

const normalizeToolkit = (toolkit: any, type: string): Toolkit => {
    return {
        id: toolkit.id,
        title: toolkit.title,
        image_url: toolkit.image_url,
        summary: toolkit.description,
        href: toolkit.url,
        facets: {
            content_types: toolkit.content_types ?? [],
            topics: toolkit.topics ?? []
        }
    };
}