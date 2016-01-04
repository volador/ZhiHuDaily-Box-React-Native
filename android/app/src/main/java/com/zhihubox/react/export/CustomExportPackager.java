package com.zhihubox.react.export;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.zhihubox.react.export.view.ReactWebViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by volador on 16-1-3.
 */
public class CustomExportPackager implements ReactPackage{
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
        List<ViewManager> managers = new ArrayList<ViewManager>();
        managers.add(new ReactWebViewManager());
        return managers;
    }
}
