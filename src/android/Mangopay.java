package hu.taracque.cordova.plugin;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;

import android.util.Log;

public class Mangopay extends CordovaPlugin {
    public static final String TAG = "Mangopay";

    @Override
    public synchronized boolean execute(String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {
        
        if (action == null) {
            return false;
        }
        
        if (action.equals("registerCard")) {
            
            try {
                this.registerCard(args, callbackContext);
            }
            catch (Exception exception) {
                callbackContext.error("Mangopay uncaught exception: " + exception.getMessage());
            }
            
            return true;
        }
        else {
            // The given action was not handled above.
            return false;
        }
    }

    private synchronized void registerCard(final JSONArray args, final CallbackContext callbackContext) throws JSONException {
        String cardNumber = args.getString(0);
        String cardExpirationMonth = args.getString(1);
        String cardExpirationYear = args.getString(2);
        String cardCvx = args.getString(3);

        // holds the card information
        MangoCard mCard = new MangoCard(cardNumber, cardExpirationMonth + "/" + cardExpirationYear, cardCvx);
        
        // register card method with callback
        mangopay.registerCard(mCard, new Callback() {
            @Override public void success(CardRegistration cardRegistration) {
                callbackContext.success();
            }

            @Override public void failure(MangoError error) {
                callbackContext.error( error.getMessage() );
            }
        });

        callbackContext.error("amount is required.");
        callbackContext.success();
    }

}
