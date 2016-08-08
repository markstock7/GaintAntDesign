# FrequencyPath

- category: Components
- chinese: 频繁路径
- type: 基本

---
### 频繁路径
智能漏斗页面中的频繁路径

### 示例代码
```html
<FrequencyPathList paths={paths} />
</FrequencyPathList>
```
<div class='wrapbox clearfix' style="visibility: hidden;height:10px;">
</div>
<div id='FrequencyPath'></div>

`````jsx
const FrequencyPathList = giui.FrequencyPathList;
const FrequencyPath = FrequencyPathList.FrequencyPath;
const mockFrequencyPaths = FrequencyPathList.mockFrequencyPaths;
ReactDOM.render(<FrequencyPathList paths={mockFrequencyPaths} />, document.getElementById('FrequencyPath'));
`````
