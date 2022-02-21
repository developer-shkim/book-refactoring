import { expect } from "chai";
import statement from "../../app/chapter01/statement.js";

describe("statement", () => {
  it("tragedy 기본 금액은 400 달러이다.", () => {
    // Given
    const invoice = {
      "customer": "Soohyun",
      "performances": [
        {
          "playID": "hamlet",
          "audience": 0
        }
      ]
    };

    const plays = {
      "hamlet": {
        "name": "Hamlet",
        "type": "tragedy"
      },
    };

    // When
    const result = statement(invoice, plays);

    // Then
    expect(result).to.contain(`청구 내역 (고객명: Soohyun)`);
    expect(result).to.contain(`Hamlet: $400.00 (0석)`);
    expect(result).to.contain(`총액: $400.00`);
  });

  it("tragedy 공연은 관객 30명 초과 시, 기본 금액에 1명당 1000 센트를 추가한다.", () => {
    // Given
    const audience = 32;
    const invoice = {
      "customer": "Soohyun",
      "performances": [
        {
          "playID": "hamlet",
          audience
        }
      ]
    };

    const plays = {
      "hamlet": {
        "name": "Hamlet",
        "type": "tragedy"
      },
    };

    // When
    const result = statement(invoice, plays);

    // Then
    expect(result).to.contain(`청구 내역 (고객명: Soohyun)`);
    expect(result).to.contain(`Hamlet: $420.00 (${audience}석)`);
    expect(result).to.contain(`총액: $420.00`);
  });

  it("comedy 기본 금액은 300 달러이다.", () => {
    // Given
    const invoice = {
      "customer": "Jeonghun",
      "performances": [
        {
          "playID": "as-like",
          "audience": 0
        }
      ]
    };

    const plays = {
      "as-like": {
        "name": "As You Like it",
        "type": "comedy"
      },
    };

    // When
    const result = statement(invoice, plays);

    // Then
    expect(result).to.contain(`청구 내역 (고객명: Jeonghun)`);
    expect(result).to.contain(`As You Like it: $300.00 (0석)`);
    expect(result).to.contain("총액: $300.00");
  });

  it("comedy 공연은 기본 금액에, 관객 1명당 300 센트를 추가한다.", () => {
    // Given
    const audience = 5;
    const invoice = {
      "customer": "Jeonghun",
      "performances": [
        {
          "playID": "as-like",
          "audience": audience
        }
      ]
    };

    const plays = {
      "as-like": {
        "name": "As You Like it",
        "type": "comedy"
      },
    };

    // When
    const result = statement(invoice, plays);

    // Then
    expect(result).to.contain("청구 내역 (고객명: Jeonghun)");
    expect(result).to.contain(`As You Like it: $315.00 (${audience}석)`);
    expect(result).to.contain("총액: $315.00");
  });

  it("comedy 공연은 관객 20명 초과 시, 기본 금액에 10000 센트와 1명당 500 센트를 추가한다.", () => {
    // Given
    const audience = 21;
    const invoice = {
      "customer": "Seongmin",
      "performances": [
        {
          "playID": "as-like",
          "audience": audience
        }
      ]
    };

    const plays = {
      "as-like": {
        "name": "As You Like it",
        "type": "comedy"
      },
    };

    // When
    const result = statement(invoice, plays);

    // Then
    expect(result).to.contain("총액: $468.00");
  });

  it("알 수 없는 장르인 경우 예외를 발생시킨다.", () => {
    // Given
    const unknownPlayType = "magic show";
    const invoice = {
      "customer": "Jimin",
      "performances": [
        {
          "playID": "as-like",
          "audience": 0
        }
      ]
    };

    const plays = {
      "as-like": {
        "name": "As You Like it",
        "type": unknownPlayType
      },
    };

    // When & Then
    try {
      const result = statement(invoice, plays);

      expect(true).to.false;
    } catch (error) {
      expect(error.message).to.equal(
        `알 수 없는 장르: ${unknownPlayType}`
      );
    }
  });

  it("관객 수 5명당 1 포인트를 적립한다.", () => {
    // Given
    const audience = 15;
    const invoice = {
      "customer": "Jimin",
      "performances": [
        {
          "playID": "as-like",
          "audience": audience
        }
      ]
    };

    const plays = {
      "as-like": {
        "name": "As You Like it",
        "type": "comedy"
      },
    };

    // When
    const result = statement(invoice, plays);

    // Then
    expect(result).to.contain("적립 포인트: 3점");
  });

  it("관객 수 30명 초과 시, 초과분 만큼 포인트를 적립한다.", () => {
    // Given
    const audience = 35;
    const invoice = {
      "customer": "Jimin",
      "performances": [
        {
          "playID": "as-like",
          "audience": audience
        }
      ]
    };

    const plays = {
      "as-like": {
        "name": "As You Like it",
        "type": "comedy"
      },
    };

    // When
    const result = statement(invoice, plays);

    // Then
    expect(result).to.contain("적립 포인트: 12점");
  });
});
