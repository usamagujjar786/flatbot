// vite.config.ts
import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import zipPack from "vite-plugin-zip-pack";

// src/manifest.ts
import { defineManifest } from "@crxjs/vite-plugin";
var manifest_default = defineManifest({
  name: "Flatbot",
  description: "",
  version: "0.0.0",
  manifest_version: 3,
  icons: {
    "16": "img/logo-16.png",
    "32": "img/logo-34.png",
    "48": "img/logo-48.png",
    "128": "img/logo-128.png"
  },
  action: {
    default_popup: "popup.html",
    default_icon: "img/logo-48.png"
  },
  options_page: "options.html",
  background: {
    service_worker: "src/background/index.ts",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/content/index.ts"]
    }
  ],
  web_accessible_resources: [
    {
      resources: ["img/logo-16.png", "img/logo-34.png", "img/logo-48.png", "img/logo-128.png"],
      matches: []
    }
  ],
  permissions: ["storage", "declarativeContent", "activeTab", "scripting"]
});

// src/read_pages_folder.ts
import globSync from "glob";
var pages = await globSync("pages/*.html");
var arrayKeyValuePairs = pages.map((file) => [file.split("\\").slice(-1).toString().split(".html").join(""), file]);
var config = Object.fromEntries(arrayKeyValuePairs);

// vite.config.ts
var vite_config_default = defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        input: config,
        output: {
          chunkFileNames: "assets/chunk-[hash].js"
        }
      }
    },
    plugins: [crx({ manifest: manifest_default }), react(), zipPack({
      outDir: `package`,
      inDir: "build",
      outFileName: `${manifest_default.short_name && manifest_default.name.replaceAll(" ", "-")}-extension-v${manifest_default.version}.zip`
    })]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInNyYy9yZWFkX3BhZ2VzX2ZvbGRlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB6aXBQYWNrIGZyb20gJ3ZpdGUtcGx1Z2luLXppcC1wYWNrJztcblxuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vc3JjL21hbmlmZXN0J1xuLy9AdHMtaWdub3JlXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL3NyYy9yZWFkX3BhZ2VzX2ZvbGRlcidcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBidWlsZDoge1xuICAgICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgICBvdXREaXI6ICdidWlsZCcsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGlucHV0OiBjb25maWcsXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL2NodW5rLVtoYXNoXS5qcycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBwbHVnaW5zOiBbY3J4KHsgbWFuaWZlc3QgfSksIHJlYWN0KCksIHppcFBhY2soe1xuICAgICAgb3V0RGlyOiBgcGFja2FnZWAsXG4gICAgICBpbkRpcjogJ2J1aWxkJyxcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIG91dEZpbGVOYW1lOiBgJHttYW5pZmVzdC5zaG9ydF9uYW1lICYmIG1hbmlmZXN0Lm5hbWUucmVwbGFjZUFsbChcIiBcIiwgXCItXCIpfS1leHRlbnNpb24tdiR7bWFuaWZlc3QudmVyc2lvbn0uemlwYCxcbiAgICB9KSxdLFxuICB9XG59KVxuIiwgImltcG9ydCB7IGRlZmluZU1hbmlmZXN0IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdCh7XG4gIG5hbWU6ICdGbGF0Ym90JyxcbiAgZGVzY3JpcHRpb246ICcnLFxuICB2ZXJzaW9uOiAnMC4wLjAnLFxuICBtYW5pZmVzdF92ZXJzaW9uOiAzLFxuICBpY29uczoge1xuICAgICcxNic6ICdpbWcvbG9nby0xNi5wbmcnLFxuICAgICczMic6ICdpbWcvbG9nby0zNC5wbmcnLFxuICAgICc0OCc6ICdpbWcvbG9nby00OC5wbmcnLFxuICAgICcxMjgnOiAnaW1nL2xvZ28tMTI4LnBuZycsXG4gIH0sXG4gIGFjdGlvbjoge1xuICAgIGRlZmF1bHRfcG9wdXA6ICdwb3B1cC5odG1sJyxcbiAgICBkZWZhdWx0X2ljb246ICdpbWcvbG9nby00OC5wbmcnLFxuICB9LFxuICBvcHRpb25zX3BhZ2U6ICdvcHRpb25zLmh0bWwnLFxuICBiYWNrZ3JvdW5kOiB7XG4gICAgc2VydmljZV93b3JrZXI6ICdzcmMvYmFja2dyb3VuZC9pbmRleC50cycsXG4gICAgdHlwZTogJ21vZHVsZScsXG4gIH0sXG4gIGNvbnRlbnRfc2NyaXB0czogW1xuICAgIHtcbiAgICAgIG1hdGNoZXM6IFsnaHR0cDovLyovKicsICdodHRwczovLyovKiddLFxuICAgICAganM6IFsnc3JjL2NvbnRlbnQvaW5kZXgudHMnXSxcbiAgICB9LFxuICBdLFxuICB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IFtcbiAgICB7XG4gICAgICByZXNvdXJjZXM6IFsnaW1nL2xvZ28tMTYucG5nJywgJ2ltZy9sb2dvLTM0LnBuZycsICdpbWcvbG9nby00OC5wbmcnLCAnaW1nL2xvZ28tMTI4LnBuZyddLFxuICAgICAgbWF0Y2hlczogW10sXG4gICAgfSxcbiAgXSxcbiAgcGVybWlzc2lvbnM6IFtcInN0b3JhZ2VcIiwgXCJkZWNsYXJhdGl2ZUNvbnRlbnRcIiwgXCJhY3RpdmVUYWJcIiwgXCJzY3JpcHRpbmdcIl0sXG59KVxuIiwgImltcG9ydCBnbG9iU3luYyBmcm9tICdnbG9iJztcblxuY29uc3QgcGFnZXMgPSBhd2FpdCBnbG9iU3luYygncGFnZXMvKi5odG1sJylcblxuY29uc3QgYXJyYXlLZXlWYWx1ZVBhaXJzID0gcGFnZXMubWFwKGZpbGUgPT4gW2ZpbGUuc3BsaXQoJ1xcXFwnKS5zbGljZSgtMSkudG9TdHJpbmcoKS5zcGxpdCgnLmh0bWwnKS5qb2luKCcnKSwgZmlsZV0pXG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSBPYmplY3QuZnJvbUVudHJpZXMoYXJyYXlLZXlWYWx1ZVBhaXJzKVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsV0FBVztBQUNwQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhOzs7QUNIcEIsU0FBUyxzQkFBc0I7QUFFL0IsSUFBTyxtQkFBUSxlQUFlO0FBQUEsRUFDNUIsTUFBTTtBQUFBLEVBQ04sYUFBYTtBQUFBLEVBQ2IsU0FBUztBQUFBLEVBQ1Qsa0JBQWtCO0FBQUEsRUFDbEIsT0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsY0FBYztBQUFBLEVBQ2QsWUFBWTtBQUFBLElBQ1YsZ0JBQWdCO0FBQUEsSUFDaEIsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLElBQ2Y7QUFBQSxNQUNFLFNBQVMsQ0FBQyxjQUFjLGFBQWE7QUFBQSxNQUNyQyxJQUFJLENBQUMsc0JBQXNCO0FBQUEsSUFDN0I7QUFBQSxFQUNGO0FBQUEsRUFDQSwwQkFBMEI7QUFBQSxJQUN4QjtBQUFBLE1BQ0UsV0FBVyxDQUFDLG1CQUFtQixtQkFBbUIsbUJBQW1CLGtCQUFrQjtBQUFBLE1BQ3ZGLFNBQVMsQ0FBQztBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFDQSxhQUFhLENBQUMsV0FBVyxzQkFBc0IsYUFBYSxXQUFXO0FBQ3pFLENBQUM7OztBQ25DRCxPQUFPLGNBQWM7QUFFckIsSUFBTSxRQUFRLE1BQU0sU0FBUyxjQUFjO0FBRTNDLElBQU0scUJBQXFCLE1BQU0sSUFBSSxVQUFRLENBQUMsS0FBSyxNQUFNLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBRTNHLElBQU0sU0FBUyxPQUFPLFlBQVksa0JBQWtCOzs7QUZJM0QsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsU0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsYUFBYTtBQUFBLE1BQ2IsUUFBUTtBQUFBLE1BQ1IsZUFBZTtBQUFBLFFBQ2IsT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFVBQ04sZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsU0FBUyxDQUFDLElBQUksRUFBRSwyQkFBUyxDQUFDLEdBQUcsTUFBTSxHQUFHLFFBQVE7QUFBQSxNQUM1QyxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFFUCxhQUFhLEdBQUcsaUJBQVMsY0FBYyxpQkFBUyxLQUFLLFdBQVcsS0FBSyxHQUFHLGdCQUFnQixpQkFBUztBQUFBLElBQ25HLENBQUMsQ0FBRTtBQUFBLEVBQ0w7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
