'use strict';

var _extends = require('@babel/runtime/helpers/extends');

var _inheritsLoose = require('@babel/runtime/helpers/inheritsLoose');

var GraphQL = require('graphql-react/universal/GraphQL');

var _require = require('next/app'),
  NextApp = _require.default;

var React = require('react');

var FORWARDABLE_LINK_REL = [
  'dns-prefetch',
  'preconnect',
  'prefetch',
  'preload',
  'modulepreload',
  'prerender',
];

module.exports = function withGraphQLApp(App) {
  var _class;

  return (
    (_class = (function (_React$Component) {
      _inheritsLoose(WithGraphQL, _React$Component);

      function WithGraphQL() {
        var _this;

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        _this =
          _React$Component.call.apply(_React$Component, [this].concat(args)) ||
          this;
        _this.graphql =
          _this.props.graphql ||
          new GraphQL({
            cache: _this.props.graphqlCache,
          });
        return _this;
      }

      var _proto = WithGraphQL.prototype;

      _proto.render = function render() {
        var appProps = _extends({}, this.props);

        delete appProps.graphqlCache;
        return React.createElement(
          App,
          _extends({}, appProps, {
            graphql: this.graphql,
          })
        );
      };

      return WithGraphQL;
    })(React.Component)),
    (_class.displayName =
      'WithGraphQL(' + (App.displayName || App.name || 'Component') + ')'),
    (_class.getInitialProps = function (context) {
      return new Promise(function (resolve) {
        Promise.resolve(
          App.getInitialProps
            ? App.getInitialProps(context)
            : NextApp.getInitialProps(context)
        ).then(function (props) {
          if (process.browser) resolve(props);
          else {
            var ssr = require('graphql-react/server/ssr');

            var _require2 = require('next/head'),
              Head = _require2.default;

            var graphql = new GraphQL();

            if (context.ctx.res.statusCode) {
              var LinkHeader = require('http-link-header');

              var graphqlLinkHeader = new LinkHeader();
              graphql.on('cache', function (_ref) {
                var response = _ref.response;

                if (response) {
                  var linkHeader = response.headers.get('Link');
                  if (linkHeader) graphqlLinkHeader.parse(linkHeader);
                }
              });
              ssr(
                graphql,
                React.createElement(
                  context.AppTree,
                  _extends({}, props, {
                    graphql: graphql,
                  })
                )
              )
                .catch(console.error)
                .then(function () {
                  Head.rewind();
                  var responseLinkHeader = new LinkHeader(
                    context.ctx.res.getHeader('Link')
                  );
                  graphqlLinkHeader.refs.forEach(function (graphqlLink) {
                    if (
                      FORWARDABLE_LINK_REL.includes(graphqlLink.rel) &&
                      !responseLinkHeader.refs.some(function (_ref2) {
                        var uri = _ref2.uri,
                          rel = _ref2.rel;
                        return (
                          uri === graphqlLink.uri && rel === graphqlLink.rel
                        );
                      })
                    )
                      responseLinkHeader.set(graphqlLink);
                  });
                  if (responseLinkHeader.refs.length)
                    context.ctx.res.setHeader(
                      'Link',
                      responseLinkHeader.toString()
                    );
                  props.graphqlCache = graphql.cache;
                  resolve(props);
                });
            } else
              ssr(
                graphql,
                React.createElement(
                  context.AppTree,
                  _extends({}, props, {
                    graphql: graphql,
                  })
                )
              )
                .catch(console.error)
                .then(function () {
                  Head.rewind();
                  props.graphqlCache = graphql.cache;
                  resolve(props);
                });
          }
        });
      });
    }),
    _class
  );
};
