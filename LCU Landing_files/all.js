/**
 * Constants
 */
var pssToken = null;
var pssWebUrl = 'https://' + pssRegion + '.lol.pss.garenanow.com/load/';
var pssDealUrl = 'https://dealservice' + pssRegion + '.garenanow.com';
var pssDealCheckUrl = pssDealUrl + '/lol/deals/check/';
var pssCurrentDeals = [];
var pssCurrentDealIdx;


/**
 * Initialization
 * This function must be called from LCU
 */
function pssStart(triggerBtnId, onPssPopUpCallback, onPssManuallyOpenCallback, onPssCloseCallback, onPssNoDealCallback) {
  pssAddPssIframe(triggerBtnId, onPssManuallyOpenCallback, onPssCloseCallback);
  pssAddTokenListener(triggerBtnId, onPssPopUpCallback, onPssNoDealCallback);
  pssRequestToken();
}

/**
 * Insert PSS to the body
 */
function pssAddPssIframe(triggerBtnId, onPssManuallyOpenCallback, onPssCloseCallback) {
  document.body.insertAdjacentHTML('beforeend', '\
    <div class="pss__wrapper"> \
      <div class="pss__border pss__border--first"></div> \
      <div class="pss__border pss__border--second"></div> \
      <div class="pss__border pss__border--third"></div> \
      \
      <div class="pss__circle pss__circle--first"></div> \
      <div class="pss__circle pss__circle--second"></div> \
      \
      <div class="pss__close-btn" id="pss__close-btn"></div> \
      <div class="pss__load-btn pss--rotating"></div> \
      <iframe class="pss__iframe" id="pss__iframe" src="about:blank" scrolling="no"></iframe> \
    </div> \
  ');

  document.getElementById(triggerBtnId).style.display = "none";
  document.getElementById(triggerBtnId).addEventListener("click", pssOpenDeals.bind(this, onPssManuallyOpenCallback));
  document.getElementById("pss__close-btn").addEventListener("click", pssCloseDeal.bind(this, onPssCloseCallback));
}

/**
 * Listen for the Token
 * Make API, trigger pss if there is deal.
 */
function pssAddTokenListener(triggerBtnId, onPssPopUpCallback, onPssNoDealCallback) {
  RClientWindowMessenger.addMessageListener({
    messageType: 'rcp-fe-lol-home-landing-token-response',
    handlers: function(messageType, data) {
      var sso_token = data['landingToken'];

      if (!sso_token || sso_token.length < 15) {
        return pssRequestToken();
      }

      pssToken = sso_token;
      pssGetCurrentDeals(
        function(deals) {
          // Case there is some deal
          pssCurrentDeals = deals;
          pssOpenDeals(onPssPopUpCallback);
          document.getElementById(triggerBtnId).style.display = "block";
        },
        function(resp) {
          // Case error / no deal
          onPssNoDealCallback && onPssNoDealCallback();
        }
      );
    }
  });
}

/**
 * Request for the Token
 */
function pssRequestToken() {
  RClientWindowMessenger.sendMessage({
    messageType: 'rcp-fe-lol-home-landing-token-request',
  });
}

/**
 * Getting deals from DealService
 * @param hasDealCallback: callback action
 * @param noDealCallback: callback action
 */
function pssGetCurrentDeals(hasDealCallback, noDealCallback) {
  var xmlhttp = new XMLHttpRequest();
  var postData  = '{"im_token":"' + pssToken + '"}';

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var response = JSON.parse(xmlhttp.responseText);
      console.log(response);
      if (!response['error'] && response['deals'].length > 0) {
        hasDealCallback(response['deals']);
      } else {
        noDealCallback(response)
      }
    }
  };
  xmlhttp.open("POST", pssDealCheckUrl, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(postData);
}

/**
 * Open PSS Deal with Callback if success
 * @param onPssOpenCallback
 */
function pssOpenDeals(onPssOpenCallback) {
  document.getElementsByClassName("pss__wrapper")[0].style.display = "block";
  pssCurrentDealIdx = -1;
  if (pssOpenNextDeal()) {
    onPssOpenCallback && onPssOpenCallback();
  }
}

/**
 * Close-Button clicked
 * Try to open the next deal first before closing iframe
 */
function pssCloseDeal(onPssCloseCallback) {
  if (!pssOpenNextDeal()) {
    document.getElementById("pss__iframe").src = "about:blank";
    document.getElementsByClassName("pss__wrapper")[0].style.display = "none";
    onPssCloseCallback && onPssCloseCallback();
  }
}

/**
 * Open next Deal
 * @returns {boolean} if there is next deal or not
 */
function pssOpenNextDeal() {
  pssCurrentDealIdx ++;

  if (pssCurrentDealIdx < pssCurrentDeals.length) {
    // Open next deal
    document.getElementById("pss__iframe").src = pssWebUrl + "?token=" + pssToken + "&deal_id=" + pssCurrentDeals[pssCurrentDealIdx]["deal_id"];
    return true;
  } else {
    // This is the last deal already
    return false;
  }
}