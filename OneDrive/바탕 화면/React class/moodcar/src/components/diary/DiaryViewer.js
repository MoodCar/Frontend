import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const DiaryViewerBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const DiaryHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1 {
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;

const SubInfo = styled.div`
    margin-top: 1rem;
    color: ${palette.gray[6]};

    /* span 사이에 가운뎃점 문자 보여주기 */
    span + span:before {
        color: ${palette.gray[5]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7'; /* 가운뎃점 문자 */
    }
`;

const DiaryContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;

const DiaryViewer = ({ diary, error, loading }) => {
    // 에러 발생 시
    if (error) {
        if (error.response && error.response.status === 404) {
            return <DiaryViewerBlock>존재하지 않는 일기입니다.</DiaryViewerBlock>;
        }
        return <DiaryViewerBlock>오류 발생</DiaryViewerBlock>;
    }

    // 로딩 중이거나 아직 일기 데이터가 없을 때
    if (loading || !diary) {
        return null;
    }
    
    const { title, content, user, publishedDate } = diary;
    return (
        <DiaryViewerBlock>
            <DiaryHead>
                <h1>{title}</h1>
                <SubInfo>
                    <span>
                        <b>{user.email}</b>
                    </span>
                    <span>{new Date(publishedDate).toLocaleDateString()}</span>
                </SubInfo>
            </DiaryHead>
            <DiaryContent
                dangerouslySetInnerHTML={{ __html: content }}>
            </DiaryContent>
        </DiaryViewerBlock>
    );
};

export default DiaryViewer;