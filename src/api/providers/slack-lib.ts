
export const buildBlockMarkdownSection = (text: string) => {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text
    }
  }
}
const CELL_WIDTH = 20;
export const fillStr = (str: string) =>  str + ' '.repeat(CELL_WIDTH- str.length);

export const TestData = {
  table: [
    { head1: 'Head1', head2: '24', head3: 'master'},
    { head2: 'Head2', hread2: '23', head3: 'master'},
  ]
};

export const buildTableMarkdownSection = (data: any[], header: string[] = []) => {
  let blocks = [];
  let tableHeaders = header.length > 0 ? header : (data.length > 0 ? Object.keys(data[0]) : []);
  console.log(tableHeaders);
  if (tableHeaders.length > 0) {
    const markdownHeader = '*' + tableHeaders.map((h: string) => fillStr(h)).join('') + '*';
    blocks.push(buildBlockMarkdownSection(markdownHeader));
  }
  const dataRows: string[] = data.map((e: any) => Object.keys(e).map(key => fillStr(e[key])).join(''));
  dataRows.forEach((dataRow: string) => {
    blocks.push(buildBlockMarkdownSection(dataRow));
  })
  return blocks;
}
