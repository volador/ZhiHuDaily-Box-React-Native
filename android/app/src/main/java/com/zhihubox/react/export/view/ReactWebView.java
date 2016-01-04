package com.zhihubox.react.export.view;

import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;
import android.webkit.WebView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by volador on 16-1-3.
 */
public class ReactWebView extends WebView {
    public ReactWebView(Context context) {
        super(context);
    }

    public ReactWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public ReactWebView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public ReactWebView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    @Override
    protected void onScrollChanged(final int l, final int t, final int oldl, final int oldt){
        super.onScrollChanged(l, t, oldl, oldt);

        WritableMap event = Arguments.createMap();
        event.putInt("ScrollX", l);
        event.putInt("ScrollY", t);
        ReactContext reactContext = (ReactContext) this.getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(this.getId(), "topChange", event);
    }
}
