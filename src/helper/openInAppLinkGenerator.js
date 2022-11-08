const deepLink = {
    amazon:{
        ios:"com.amazon.mobile.shopping.web://",
        android:"com.amazon.mobile.shopping.web://"
    },
    instagram:{
        ios:"instagram://",
        android:"intent://"
    },
    youtube:{
        ios:"vnd.youtube://",
        android:"intent://"
    },
    facebook:{
        ios:"fb://",
        android:"fb://"
    },
    twitter:{
        ios:"twitter://",
        android:"intent://"
    },
    linkedin:{
        ios:"linkedin://",
        android:"intent://"
    },
    tiktok:{
        ios:"url://",
        android:"intent://"
    }
}
// intent://twitter.com/DinaBelenkaya/#Intent;scheme=https;S.browser_fallback_url=https://twitter.com/DinaBelenkaya;end
const getWebsiteName = (link) =>{
    if(link.includes('youtube') ||link.includes('youtu.be')){
        return 'youtube';
    }else if(link.includes('amazon') || link.includes('amzn')){
        return 'amazon';
    }else if(link.includes('twitter') || link.includes('twitter')){
        return 'twitter';
    }else if(link.includes('facebook') || link.includes('facebook')){
        return 'facebook';
    }else if(link.includes('instagram') || link.includes('instagram')){
        return 'instagram';
    }else if(link.includes('linkedin') || link.includes('linkedin')){
        return 'linkedin';
    }else if(link.includes('tiktok') || link.includes('tiktok')){
        return 'tiktok';
    }else{
        return 'none';
    }
}

const userDevice = ()=>{
    const userAgent = navigator.userAgent;

    if(userAgent.includes('Android')){
        return 'android';
    }else if(userAgent.includes('iPhone')){
        return 'ios';
    }else {
        return 'other'
    }
}

const generateDeepLink = (link)=>{
    const device = userDevice();
    const website = getWebsiteName(link);
    const withoutHttps = link.split('//')[1];
    switch(device){
        case 'android':
            link = deepLink[website][device]+withoutHttps+'#Intent;scheme=https;S.browser_fallback_url='+link+';end';
            break;
        case 'ios':
            link = deepLink[website][device]+withoutHttps;
            break;
        default:
            link = link;
    }
    return link;
}

module.exports.generateDeepLink = generateDeepLink;