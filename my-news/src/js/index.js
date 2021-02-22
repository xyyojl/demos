import './imports';
import service from '../services';

async function getNewsList() {
    const data = await service.getNewsList('top', 10);
    console.log(data);
};

getNewsList();