import { BookDetails } from './BookDetails.Page';
import { HomeScreen } from './Home.Page';
import { ReadingListScreen } from './ReadingList.Page';
import { SearchScreen } from './Search.Page';

const pagesIndex = {
    home: {
        component: HomeScreen,
        name: 'home',
    },
    search: {
        component: SearchScreen,
        name: 'search',
    },
    readingList: {
        component: ReadingListScreen,
        name: 'readingList',
    },
    bookDetails: {
        component: BookDetails,
        name: 'bookDetails',
    },
};

export default pagesIndex;
