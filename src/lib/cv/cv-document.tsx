import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { type CvLocale, getCvContent } from './content';

const COPPER = '#9a5f37';
const INK = '#1c1a17';
const INK_MUTED = '#55524c';
const LINE = '#d8d2c7';

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 36,
    paddingHorizontal: 44,
    fontSize: 9.5,
    color: INK,
    fontFamily: 'Helvetica',
  },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: INK },
  roles: { marginTop: 4, fontSize: 10, color: COPPER, fontFamily: 'Helvetica-Bold' },
  contactRow: { marginTop: 8, flexDirection: 'row', flexWrap: 'wrap', gap: 14, fontSize: 9 },
  contactItem: { color: INK_MUTED },
  link: { color: COPPER, textDecoration: 'none' },
  rule: { marginTop: 14, marginBottom: 14, height: 1.4, backgroundColor: COPPER },
  body: { flexDirection: 'row', gap: 26 },
  colMain: { flex: 1.55 },
  colSide: { flex: 1 },
  sectionLabel: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: COPPER,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionSpacing: { marginTop: 16 },
  intro: { fontSize: 9.5, lineHeight: 1.5, color: INK_MUTED },
  entry: { marginBottom: 10 },
  entryHeadRow: { flexDirection: 'row', justifyContent: 'space-between' },
  entryRole: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: INK },
  entryPeriod: { fontSize: 8.5, color: INK_MUTED },
  entryOrg: { fontSize: 9, fontFamily: 'Helvetica-Oblique', color: COPPER, marginTop: 1 },
  entryDesc: { marginTop: 3, fontSize: 8.8, lineHeight: 1.45, color: INK_MUTED },
  sideLine: { fontSize: 9, lineHeight: 1.6, color: INK_MUTED, marginBottom: 2 },
  stackGroupTitle: { fontSize: 8.8, fontFamily: 'Helvetica-Bold', color: INK, marginTop: 6, marginBottom: 2 },
  stackItems: { fontSize: 8.3, lineHeight: 1.5, color: INK_MUTED },
  certItem: { fontSize: 8.3, lineHeight: 1.55, color: INK_MUTED },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 44,
    right: 44,
    borderTopWidth: 0.6,
    borderTopColor: LINE,
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7.6,
    color: INK_MUTED,
  },
});

export function CvDocument({ locale }: { locale: CvLocale }) {
  const c = getCvContent(locale);

  return (
    <Document title={`${c.name} — CV`} author={c.name}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{c.name}</Text>
        <Text style={styles.roles}>{c.roles}</Text>

        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>{c.email}</Text>
          <Link src={c.githubUrl} style={styles.link}>
            {c.github}
          </Link>
          <Link src={c.linkedinUrl} style={styles.link}>
            {c.linkedin}
          </Link>
          <Link src={c.siteUrl} style={styles.link}>
            {c.site}
          </Link>
        </View>

        <View style={styles.rule} />

        <Text style={styles.intro}>{c.intro}</Text>

        <View style={[styles.body, styles.sectionSpacing]}>
          <View style={styles.colMain}>
            <Text style={styles.sectionLabel}>{c.experienceLabel}</Text>
            {c.experience.map((e, i) => (
              <View key={i} style={styles.entry}>
                <View style={styles.entryHeadRow}>
                  <Text style={styles.entryRole}>{e.role}</Text>
                  <Text style={styles.entryPeriod}>{e.period}</Text>
                </View>
                <Text style={styles.entryOrg}>{e.org}</Text>
                <Text style={styles.entryDesc}>{e.desc}</Text>
              </View>
            ))}

            <Text style={[styles.sectionLabel, styles.sectionSpacing]}>{c.educationLabel}</Text>
            {c.education.map((e, i) => (
              <View key={i} style={styles.entry}>
                <View style={styles.entryHeadRow}>
                  <Text style={styles.entryRole}>{e.role}</Text>
                  <Text style={styles.entryPeriod}>{e.period}</Text>
                </View>
                <Text style={styles.entryOrg}>{e.org}</Text>
                <Text style={styles.entryDesc}>{e.desc}</Text>
              </View>
            ))}
          </View>

          <View style={styles.colSide}>
            <Text style={styles.sectionLabel}>{c.stackTitle}</Text>
            {c.stack.map((group, i) => (
              <View key={i}>
                <Text style={styles.stackGroupTitle}>{group.title}</Text>
                <Text style={styles.stackItems}>{group.items}</Text>
              </View>
            ))}

            <Text style={[styles.sectionLabel, styles.sectionSpacing]}>{c.certificationsLabel}</Text>
            {c.certifications.map((title, i) => (
              <Text key={i} style={styles.certItem}>
                · {title}
              </Text>
            ))}

            <Text style={[styles.sectionLabel, styles.sectionSpacing]}>{c.languagesLabel}</Text>
            <Text style={styles.sideLine}>{c.languages}</Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>{c.tagline}</Text>
          <Text>{c.site}</Text>
        </View>
      </Page>
    </Document>
  );
}
