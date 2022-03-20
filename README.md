# 개요
[<리팩터링 2판>(마틴 파울러, 한빛미디어)](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791162242742&orderClick=LAG&Kc=) 으로 스터디한 내용을 정리하고 있습니다. 

# 환경설정
### 1. node, yarn 을 설치합니다.
- 이미 설치되어 있다면, skip 하셔도 됩니다.

```sh
brew install node
brew install yarn

node -v     # 버전이 출력되면 정상적으로 설치된 것입니다!
yarn -v     # 버전이 출력되면 정상적으로 설치된 것입니다!
```

### 2. yarn 으로 패키지를 설치합니다.
```sh
yarn install
```

### 기타
- 테스트 실행은 아래와 같이 합니다.
```sh
yarn test
```