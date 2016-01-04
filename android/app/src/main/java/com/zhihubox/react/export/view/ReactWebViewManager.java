package com.zhihubox.react.export.view;

import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

/**
 * Created by volador on 16-1-3.
 */
public class ReactWebViewManager extends SimpleViewManager<ReactWebView>{

    public static final String REACT_EXPORT_WEBVIEW_CLASS = "ReactWebView";

    @Override
    public String getName() {
        return REACT_EXPORT_WEBVIEW_CLASS;
    }

    @Override
    protected ReactWebView createViewInstance(ThemedReactContext themedReactContext) {
        return new ReactWebView(themedReactContext);
    }

    @ReactProp(name = "html")
    public void setHtml(final ReactWebView reactWebView, String html){
        reactWebView.loadData(html, "text/html; charset=utf-8", "UTF-8");
    }

    @ReactProp(name = "url")
    public void setUrl(final ReactWebView webView, String url) {
        webView.loadUrl(url);
    }
}
