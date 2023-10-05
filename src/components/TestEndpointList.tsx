import Link from "next/link";

//TODO create proper requests with proper bodies to test

export function EndpointList() {
    return (
        <ul>
            <li><Endpoint url="http://localhost:8080/api/test/all" /></li>
            <li><Endpoint url="http://localhost:8080/api/test/user" /></li>
            <li><Endpoint url="http://localhost:8080/api/test/mod" /></li>
            <li><Endpoint url="http://localhost:8080/api/test/admin" /></li>
        </ul>
    )
}

function Endpoint({ url }: { url: string }) {
    return <Link href={url}>Visit: {url}</Link>
}