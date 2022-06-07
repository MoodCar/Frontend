# MoodCar - Frontend
<center><img src="src/images/logo.png"></center>
<br />
<center><div>감정일기 서비스 MoodCar</div></center>
<br/>
<br />

## 목차
1. [개요](#개요)
2. [기능 설명](#기능-설명)
3. [페이지 구성](#페이지-구성)

<br />

---
<br /> <br />

## 개요
바쁜 현대인들은 하루를 돌아보는 시간을 갖는 것이 쉽지 않다. 일기를 쓰면서 하루를 되돌아 볼 수는 있지만, 아날로그 일기의 경우 어떤 날에 무슨 일이 있었고 어떤 감정을 느꼈는지 되돌아보기 위해서는 일기 전체를 읽어봐야 하므로 시간이 많이 소모된다는 단점이 있다. 또한 일기를 작성할 때 자신이 느낀 감정을 정확하게 파악하지 못할 때도 있다.

감정 일기 서비스 Moodcar는 인공지능을 이용해 일기 내용으로 감정 분포 및 주요 활동을 자동으로 추론한다. 그리고 달력에 보기 좋게 기록한다. 더 나아가 사용자가 느낀 감정에 따라 콘텐츠(음악, 상담사 등)를 추천해줌으로써, 사용자가 감정을 다스릴 수 있게 도와준다.

<br />

----------------------------

<br />

## 기능 설명

### <일기 작성>
1. 구글 로그인
<br />구글 계정을 통해 MoodCar에 로그인할 수 있습니다.

2. 일기 작성
<br />사용자가 일기를 작성하면 감정, 키워드 추출 모델로 일기 내용을 전달하고, 모델에서 감정 및 키워드가 반환됩니다.

### <일기 관리>
3. 달력
<br />등록된 일기의 감정과 키워드는 달력에서 확인할 수 있습니다.

4. 세부 페이지
<br />세부 페이지에서 해당 일기의 내용과 추출된 키워드, 대표 감정, 감정 분석 결과를 수치로 확인할 수 있습니다.

5. 감정, 키워드 수정
<br />추출된 감정이나 키워드를 직접 수정할 수 있습니다.

6. 피드백
<br />수정 과정에서 피드백을 보낼 수 있고, 피드백을 보내면 추후에 모델의 성능 개선에 데이터가 반영됩니다.

### <콘텐츠 추천>
7. 콘텐츠 추천
    - 일반적인 경우
    <br />오늘 작성한 일기의 감정에 해당하는 추천 콘텐츠를 확인할 수 있습니다. 콘텐츠의 종류는 음악, 영상이 있습니다.

    - 부정적인 패턴
    <br />사용자가 혐오,분노,슬픔같은 부정적인 감정을 지속적으로 느끼는 등의 패턴을 보이는 경우에는 그 감정을 다스리는 방향으로 콘텐츠를 추천받을 수 있습니다.

### <편의 기능>
8. 일기 검색
<br />일기 검색 페이지에서 검색 단어를 입력하면 키워드 또는 일기 내용과 일치하는 일기 목록을 확인할 수 있습니다.

9. 통계 페이지
<br />사용자의 전체 일기의 감정 통계를 확인할 수 있고, 각 감정별로 일기 목록을 확인할 수 있습니다.

<br />

---

<br/><br/>

## 페이지 구성

<br/>

### <일기 작성>

- 로그인페이지
![로그인페이지](https://user-images.githubusercontent.com/65543730/172407093-681610a5-15fd-4779-8a05-856e57e394d0.jpg)

<br />

- 일기 작성 페이지
![일기작성페이지](https://user-images.githubusercontent.com/65543730/172407847-0a2f3a12-9327-497f-8bfc-ba8ac75795cc.jpg)

<br />

### <일기 관리>

- 메인 페이지
![메인페이지](https://user-images.githubusercontent.com/65543730/172407660-c1de1364-0380-4da7-b996-57a91da645ec.jpg)

<br />

- 세부 내용 페이지
![세부페이지](https://user-images.githubusercontent.com/65543730/172407983-c8ea25d3-a584-44ac-affe-2eebbb5a31f3.jpg)

<br />

- 감정, 키워드 수정 및 피드백
![감정수정](https://user-images.githubusercontent.com/65543730/172408747-e0517db7-86d6-491e-be1c-9796cea918c0.jpg)

<br />

### <콘텐츠 추천>

- 일반적인 경우
![콘텐츠추천](https://user-images.githubusercontent.com/65543730/172409100-136272ca-24ef-46b2-a909-dd0892130254.jpg)

<br />

- 부정적인 패턴
![부정적인패턴](https://user-images.githubusercontent.com/65543730/172409239-2372f8c9-c14f-47be-b83c-fcc39da951ad.jpg)

<br />

### <편의 기능>

- 일기 검색 페이지
![검색페이지](https://user-images.githubusercontent.com/65543730/172409367-7fc6cd83-3c52-493b-966a-2b161888e80d.jpg)

<br />

- 통계 페이지
![통계페이지](https://user-images.githubusercontent.com/65543730/172409461-7abf79fb-750c-47ae-a5ef-8b4cbde35c50.jpg)
