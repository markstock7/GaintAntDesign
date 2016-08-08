import FrequencyPathList        from './FrequencyPathList';
import FrequencyPath            from './FrequencyPath';
import mockFrequencyPaths       from './data.js';
import './style/index.less';

// mock 数据
FrequencyPathList.mockFrequencyPaths = mockFrequencyPaths;

//
FrequencyPathList.FrequencyPath = FrequencyPath;

export default FrequencyPathList;
