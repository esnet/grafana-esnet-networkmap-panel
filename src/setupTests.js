import { getDataSourceSrv } from '@grafana/runtime';
import '@testing-library/jest-dom/extend-expect';

jest.mock('@grafana/runtime', () => ({
    getDataSourceSrv: jest.fn().mockReturnValue({
        get: jest.fn().mockResolvedValue({
            query: jest.fn().mockResolvedValue({ data: [] }),
        })
    })
}));
