const { withAppDelegate, withSwiftBridgingHeader, withMainActivity } = require('@expo/config-plugins')
const { mergeContents, createGeneratedHeaderComment, removeGeneratedContents } = require('@expo/config-plugins/build/utils/generateCode')

const appendContents = ({ src, newSrc, tag, comment }) => {
  const header = createGeneratedHeaderComment(newSrc, tag, comment)
  if (!src.includes(header)) {
    const sanitizedTarget = removeGeneratedContents(src, tag)
    const contentsToAdd = [
      header,
      newSrc,
      `${comment} @generated end ${tag}`,
    ].join('\n')
    return {
        contents: sanitizedTarget ?? src + contentsToAdd,
        didMerge: true,
        didClear: !!sanitizedTarget,
    }
  }
  return { contents: src, didClear: false, didMerge: false }
}

const withIosSwiftBridgingImport = (config) => {
  const newConfig = withSwiftBridgingHeader(config, (config) => {
    const newSrc = ['#import <RNGlobalKeyEventViewController.h>']
    const newConfig = appendContents({
      tag: 'expo-global-keyevent-import',
      src: config.modResults.contents,
      newSrc: newSrc.join('\n'),
      comment: '//',
    })
    return {
      ...config,
      modResults: newConfig,
    }
  })
  return newConfig
}

const withAndroidMainActivityImport = (config) => {
  const newConfig = withMainActivity(config, (config) => {
    const newSrc = [
      'import android.view.KeyEvent;',
      'import com.globalkeyevent.GlobalKeyEventModule;',
    ]
    const newConfig = mergeContents({
      tag: 'expo-global-keyevent-import',
      src: config.modResults.contents,
      newSrc: newSrc.join('\n'),
      anchor: `;`,
      offset: 1,
      comment: '//',
    })
    return {
      ...config,
      modResults: newConfig,
    }
  })
  return newConfig
}

const withAndroidMainActivityBody = (config) => {
  const newConfig = withMainActivity(config, (config) => {
    const newSrc = [
      '@Override',
      'public boolean onKeyDown(int keyCode, KeyEvent event) {',
      '  GlobalKeyEventModule instance = GlobalKeyEventModule.getInstance();',
      '  if (instance != null) instance.onKeyDownEvent(keyCode, event);',
      '  return super.onKeyDown(keyCode, event);',
      '}',
      '',
      '@Override',
      'public boolean onKeyUp(int keyCode, KeyEvent event) {',
      '  GlobalKeyEventModule instance = GlobalKeyEventModule.getInstance();',
      '  if (instance != null) instance.onKeyUpEvent(keyCode, event);',
      '  return super.onKeyUp(keyCode, event);',
      '}',
    ]
    const newConfig = mergeContents({
      tag: 'expo-global-keyevent-body',
      src: config.modResults.contents,
      newSrc: newSrc.join('\n'),
      anchor: `public class MainActivity extends ReactActivity {`,
      offset: 1,
      comment: '//',
    })
    return {
      ...config,
      modResults: newConfig,
    }
  })
  return newConfig
};

const initPlugin = (config) => {
  config = withIosSwiftBridgingImport(config)
  config = withAndroidMainActivityImport(config)
  config = withAndroidMainActivityBody(config)
  return config
};

export default initPlugin
