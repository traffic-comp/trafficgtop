const URI = {
  dev: 'http://localhost:8080',
  prod: 'https://us-central1-test2-411610.cloudfunctions.net/trackform',
};

const mode = URI['prod'];

const hendlebutton = document.querySelectorAll('.hendlebutton');
const fomr = document.querySelector('#form');
const links = {
  whatsapp: 'https://wa.me/420722242996',
};

const getIp = async () => {
  const res = await fetch('https://api64.ipify.org');
  const data = await res.text();
  return data;
};

function stringToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
async function geoIpLookup() {
  const res = await fetch('https://get.geojs.io/v1/ip/country.json');

  const { country, ip } = await res.json();

  return { country, ip };
}

const handleClick = async function (e) {
  e.preventDefault();
  const leadIp = await geoIpLookup();

  switch (this.dataset.platform) {
    case 'skype':
      openSkype('live:.cid.a69ff49abe732e55');
      break;
    case 'telegram':
      const data = `${decodeURIComponent(getUtmParams().ad)}-${leadIp.country}`;
      console.log(`tg://resolve?domain=trafficg_hot_leads_bot&start=${data}`);
      
      window.location.href = `tg://resolve?domain=trafficg_hot_leads_bot&start=${
        getUtmParams().ad
      }-${leadIp.country}`;
      break;
    case 'whatsapp':
      window.location.href = links[this.dataset.platform];
      break;
    default:
      return;
  }


  fbq('track', 'Lead');
  const chat_id = "8119682966";
  await fetch(
    `https://api.telegram.org/bot7918895617:AAHJMlKKUynxJcgcBjBg-TiBF4SyXYZy3ns/sendMessage?chat_id=${chat_id}&text=${JSON.stringify(
       {
       platform: this.dataset.platform,
       userId: "7325647133",
       created_at: Date.now(),
       utmLink: getUtmParams().ad,
       leadIp: leadIp.ip,
     }
    )}
    `,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }
  );
};

hendlebutton.forEach((item) => {
  item.addEventListener('click', handleClick);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const leadIp = await getIp();
  const email = form.querySelector('.email-input');
  const emailValue = email.value.trim();
  const errorMessage = form.querySelector('.error-message');
  const thxMessage = document.querySelector('.thx-message');

  if (!emailValue.trim()) {
    errorMessage.innerHTML = 'This field cant be empty';
    return false;
  }

  thxMessage.innerHTML = 'Thank you!';
  email.value = '';
  errorMessage.innerHTML = '';

  fbq('track', 'Lead');
  const chat_id = "8119682966";
  await fetch(
    `https://api.telegram.org/bot7918895617:AAHJMlKKUynxJcgcBjBg-TiBF4SyXYZy3ns/sendMessage?chat_id=${chat_id}&text=${JSON.stringify(
       {
       platform: this.dataset.platform,
       userId: "7325647133",
       created_at: Date.now(),
       utmLink: getUtmParams().ad,
       leadIp: leadIp.ip,
     }
    )}
    `,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }
  );
});

function getUtmParams() {
  var params = new URLSearchParams(window.location.search);

  // Составляем объект с UTM параметрами
  var utmParams = {
    ad: params.get('ad'),
    pixel: params.get('pixel'),
  };

  // Убираем параметры с пустыми значениями
  Object.keys(utmParams).forEach((key) => {
    if (!utmParams[key]) {
      delete utmParams[key];
    }
  });

  return utmParams;
}

function openSkype(username) {
  const skypeLink = `skype:${username}?chat`;
  const appStoreLink = 'https://apps.apple.com/app/skype/id304878510';
  const playStoreLink =
    'https://play.google.com/store/apps/details?id=com.skype.raider';
  const skypeWebLink = 'https://web.skype.com/';

  const link = document.createElement('a');
  link.href = skypeLink;
  document.body.appendChild(link);

  const now = Date.now();
  link.click();

  // Проверяем, открылось ли приложение
  setTimeout(() => {
    if (Date.now() - now < 1500) {
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = appStoreLink;
      } else if (/Android/i.test(navigator.userAgent)) {
        window.location.href = playStoreLink;
      } else {
        window.location.href = skypeWebLink;
      }
    }
  }, 1000);
}
