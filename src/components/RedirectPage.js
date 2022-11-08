import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { generateDeepLink } from '../helper/openInAppLinkGenerator';

function redirectToApp(link){
  var link= generateDeepLink(link.replace(/&amp;/g, '&')) ;
	var noapplink=link.replace(/&amp;/g, '&');
  console.log(link);
	function try_close(){
		window.location.replace('about:blank');	
	}
	var start = Date.now();
	function noappfound(){
		var now = Date.now();
		if (now - start > 4000) {
		} else if(now - start > 500){
			window.location.replace(noapplink);
		}
	}
	window.location.replace(link);
	setTimeout(noappfound, 501);
      
}


function RedirectPage() {

  async function getRedirectUrl(){
    const url = window.location.href;
    const redirectId = url.split('/')[3];
    const {data} = await axios.get('http://localhost:3001/click'+'/'+ redirectId).catch((err)=>{
      console.log(data);
      })
      redirectToApp(data.links);
  }
    
  useEffect(()=>{
    getRedirectUrl();
  },[]);
  return (
    <div>
      <div className='header'>
        <img src='./logo192.png' width={'60px'} height={'50px'}/>
        <h2>theOne<span>Link</span></h2>
      </div>
      <div>
        <object height={'300px'} type="image/svg+xml" data="./rocket-animation.svg" alt="animated rocket tutorial" img="" width="100%"></object>
        <p>Opening link in app</p>
        <h2>create direct to app like for:</h2>

        <div className='socials'>
          <div className='row'>
            <img src='./facebook.gif'></img>
            <img src='./instagram.gif'></img>
            <img src='./tiktok.gif'></img>
            <img src='./amazon.png'></img>
          </div>
          <div className='row'>
            <img src='./youtube.gif'></img>
            <img src='./linkedin.gif'></img>
            <img src='./twitter.gif'></img>
            <span> Many more</span>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default RedirectPage
