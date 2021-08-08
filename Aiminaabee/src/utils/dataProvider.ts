import { DataProvider } from 'recyclerlistview';

export const dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
});