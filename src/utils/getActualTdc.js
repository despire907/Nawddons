import formatNumberFromHtml from './formatNumberFromHtml';

export default () => formatNumberFromHtml($('.general-tooltip [href="/chasse"]+span').text());