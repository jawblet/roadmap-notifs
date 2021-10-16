import { VscLinkExternal } from "react-icons/vsc";

const LinkToAirtable = ( { id }) => {
    return(
        <a href={`${process.env.NEXT_PUBLIC_PROD_DB_URL}${id}`} 
            rel="noreferrer"
            target="_blank">
                <VscLinkExternal className="icon"/>
        </a>
    )
}

export default LinkToAirtable;