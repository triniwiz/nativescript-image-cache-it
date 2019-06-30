package com.github.triniwiz.imagecacheit;

import android.content.Context;
import android.support.annotation.NonNull;
import com.bumptech.glide.Glide;
import com.bumptech.glide.Registry;
import com.bumptech.glide.annotation.GlideModule;
import com.bumptech.glide.integration.okhttp3.*;
import com.bumptech.glide.module.AppGlideModule;
import okhttp3.*;
import com.bumptech.glide.annotation.Excludes;
import java.io.InputStream;
import com.bumptech.glide.load.model.GlideUrl;

@GlideModule
@Excludes(OkHttpLibraryGlideModule.class)
public final class MyAppGlideModule extends AppGlideModule {

    @Override
    public void registerComponents(@NonNull Context context, @NonNull Glide glide, @NonNull Registry registry) {
        super.registerComponents(context, glide, registry);
        OkHttpClient okHttpClient = new OkHttpClient();
        registry.replace(GlideUrl.class, InputStream.class, new OkHttpUrlLoader.Factory(okHttpClient));
    }
}
