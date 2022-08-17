import axios from 'axios';
import {retrieveFromIPFS} from './ipfs';

function handleParseContentURI(pinkDancers: any) {
    pinkDancers.map((item: any) => ({
        ...item,
        metadata: retrieveFromIPFS(item.contentURI.slice(7)),
    }));
}

export async function queryTheGraph(walletId: string) {
    const query = `
    	query {
    		pinkDancers(where: {owner_: { id: "${walletId}"}}) {
    			id
    			tokenID
    			contentURI
    			symbol
    			name
    			createdAtTimestamp
    			creator {
    				id
    			}
    			owner {
    				id
    			}
    		}
    	}
    `;

    const response = await axios.post(
        'https://api.thegraph.com/subgraphs/id/QmX1A4ow8tzsTnEFptJbQr5d492VemXtTdMrR6Mq2SZxwq',
        {query: query},
    );

    return handleParseContentURI(response.data.data.pinkDancers);
}
