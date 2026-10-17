import React from 'react';
import { Container } from '../../../Global/components';
import { FeaturesSection, FeaturesGrid, FeatureCard } from './styled';

const features = [
  {
    icon: '💎',
    title: 'منتجات أصلية 100%',
    desc: 'مستحضرات عناية وعطور ومكياج من أفضل الماركات'
  },
  {
    icon: '🚚',
    title: 'توصيل لكافة مناطق غزة',
    desc: 'خدمة توصيل فورية ومباشرة حتى باب منزلكِ'
  },
  {
    icon: '💳',
    title: 'دفع سهل ومرن',
    desc: 'الدفع نقداً عند الاستلام أو عبر المحافظ الإلكترونية'
  },
  {
    icon: '🎁',
    title: 'تغليف هدايا ملكي',
    desc: 'تنسيق بوكسات هدايا وتغليف فاخر لكل مناسباتكِ'
  }
];

const Features = () => {
  return (
    <FeaturesSection>
      <Container>
        <FeaturesGrid>
          {features.map((feature, idx) => (
            <FeatureCard key={idx}>
              <div className="iconWrapper">{feature.icon}</div>
              <div className="textWrapper">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </FeaturesSection>
  );
};

export default Features;
