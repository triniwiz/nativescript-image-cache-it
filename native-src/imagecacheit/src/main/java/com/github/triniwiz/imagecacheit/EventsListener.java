package com.github.triniwiz.imagecacheit;

/**
 * Created by triniwiz on 3/6/20
 */
public interface EventsListener {
    void onLoadStart();
    void onLoadError(String message);
    void onLoadedEnd();
}
